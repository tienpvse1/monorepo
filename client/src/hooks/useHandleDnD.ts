import { IPipelineColumn } from "@modules/pipeline-column/entity/pipeline-column.entity";
import { IPipeline } from "@modules/pipeline/entity/pipeline.entity";
import { useUpdatePipeline } from "@modules/pipeline/mutation/pipeline.update";

export const useHandleDnD = (data: IPipeline) => {

  const { updatePipeline } = useUpdatePipeline();

  const setNewPipeline = (newColumn: IPipelineColumn[]) => {
    const newState =
    {
      ...data,
      pipelineColumns: newColumn
    }
    
    updatePipeline(newState);
  }

  const reassign = (array: Array<IPipelineColumn>, index: number, newValue: IPipelineColumn) => {
    array[index] = newValue;
    return array;
  }

  const handleMoveColumn = (startIndex: number, finishIndex: number) => {
    //lấy mảng pipelineColumns ra
    const pipelineNewColumns = Array.from(data.pipelineColumns);

    reassign(pipelineNewColumns, startIndex, {...pipelineNewColumns[startIndex], index: finishIndex })
    reassign(pipelineNewColumns, finishIndex, {...pipelineNewColumns[finishIndex], index: startIndex })


    // lấy ra dữ liệu column đang được nắm kéo
    const [newItemColumn] = pipelineNewColumns.splice(startIndex, 1);

    // thêm dữ liệu column vừa đc lấy ra bỏ vào vị trí điểm đến finishIndex
    pipelineNewColumns.splice(finishIndex, 0, newItemColumn);

    //set lại column mới vô state
    setNewPipeline(pipelineNewColumns);
  }

  const handleMoveItemColumn = (startIndex: number, finishIndex: number, columnName: string) => {
    // tìm column theo name và trả về giá trị column tìm đc
    const column = data.pipelineColumns.find(value =>
      value.name == columnName)

    // lấy items của column vừa tìm được bỏ vào pipelineNewColumns
    const pipelineNewItems = Array.from(column!.pipelineItems);

    // lấy ra dữ liệu card đang được nắm kéo
    const [newItemColumn] = pipelineNewItems.splice(startIndex, 1);

    // thêm dữ liệu card vừa đc lấy ra bỏ vào vị trí điểm đến finishIndex
    pipelineNewItems.splice(finishIndex, 0, newItemColumn);

    //update lại pipeline mới sau khi đổi chỗ card
    const newColumn = data.pipelineColumns.map((item) => {
      if (item.name == columnName)
        return { ...item, pipelineItems: pipelineNewItems };
      else
        return item;
    })
    setNewPipeline(newColumn);

  }

  const handleMoveItemsBetweenColumns = (
    startIndex: number,
    finishIndex: number,
    startColumnName: string,
    finishColumnName: string) => {

    //------------------------------------------------------------
    //lấy item đó ra khỏi column start
    const column1 = data.pipelineColumns.find(value =>
      value.name == startColumnName)

    const NewItems1 = Array.from(column1!.pipelineItems);
    const [newItemColumn] = NewItems1.splice(startIndex, 1);
    //------------------------------------------------------------
    //bỏ item vừa lấy ra từ column start cho vào column finish
    const column2 = data.pipelineColumns.find(value =>
      value.name == finishColumnName)

    const NewItems2 = Array.from(column2!.pipelineItems);
    NewItems2.splice(finishIndex, 0, newItemColumn);
    //------------------------------------------------------------

    // update lại state mới sau khi đổi chỗ 
    const newColumn = data.pipelineColumns.map((item) => {
      if (item.name == startColumnName)
        return { ...item, pipelineItems: NewItems1 };
      else if (item.name == finishColumnName)
        return { ...item, pipelineItems: NewItems2 };
      else
        return item;
    })
    setNewPipeline(newColumn);

  }

  return {
    handleMoveColumn,
    handleMoveItemColumn,
    handleMoveItemsBetweenColumns
  };
}