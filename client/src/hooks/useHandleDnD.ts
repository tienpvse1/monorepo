import { IPipelineColumn } from "@modules/pipeline-column/entity/pipeline-column.entity";
import { useChangeStagePipelineItems } from "@modules/pipeline-items/mutation/pipeline-items.changeStage";
import { IPipeline } from "@modules/pipeline/entity/pipeline.entity";
import { useUpdatePipeline } from "@modules/pipeline/mutation/pipeline.update";
import { useState } from "react";

export const useHandleDnD = (data: IPipeline) => {
  const [newPipeLine, setPipeLine] = useState<IPipeline>();
  const { updatePipeline, isError } = useUpdatePipeline();
  const { changeStage } = useChangeStagePipelineItems();

  const setNewPipeline = (newColumn: IPipelineColumn[]) => {
    const newState =
    {
      ...data,
      pipelineColumns: newColumn,
    };
    setPipeLine(newState);
    updatePipeline(newState);
  };

  const handleChangeStageItems = (
    newColumn: IPipelineColumn[],
    draggableId: string,
    startColumn: string,
    finishColumn: string
  ) => {
    const newState =
    {
      ...data,
      pipelineColumns: newColumn,
    }

    setPipeLine(newState);
    changeStage({
      ...newState,
      infoChangeStage: {
        itemsId: draggableId,
        oldStage: startColumn,
        newStage: finishColumn
      }
    })

  }

  const reassignIndex = <T>(array: Array<T>) => {
    return array.map((value, index) => ({ ...value, index: index }));
  };

  const handleMoveColumn = (startIndex: number, finishIndex: number) => {
    //lấy mảng pipelineColumns ra
    const pipelineNewColumns = Array.from(data.pipelineColumns);

    // lấy ra dữ liệu column đang được nắm kéo
    const [newItemColumn] = pipelineNewColumns.splice(startIndex, 1);

    // thêm dữ liệu column vừa đc lấy ra bỏ vào vị trí điểm đến finishIndex
    pipelineNewColumns.splice(finishIndex, 0, newItemColumn);

    //set lại column mới vô state

    setNewPipeline(reassignIndex(pipelineNewColumns));
  };

  const handleMoveItemColumn = (startIndex: number, finishIndex: number, columnName: string) => {
    // tìm column theo name và trả về giá trị column tìm đc
    const column = data.pipelineColumns.find(value =>
      value.name == columnName)

    // lấy items của column vừa tìm được bỏ vào pipelineNewColumns
    const pipelineNewItems = Array.from(column.pipelineItems);

    // lấy ra dữ liệu card đang được nắm kéo
    const [newItemColumn] = pipelineNewItems.splice(startIndex, 1);

    // thêm dữ liệu card vừa đc lấy ra bỏ vào vị trí điểm đến finishIndex
    pipelineNewItems.splice(finishIndex, 0, newItemColumn);

    //update index
    const result = reassignIndex(pipelineNewItems);

    //update lại pipeline mới sau khi đổi chỗ card
    const newColumn = data.pipelineColumns.map((item) => {
      if (item.name == columnName)
        return { ...item, pipelineItems: result };
      else
        return item;
    })
    setNewPipeline(newColumn);

  }

  const handleMoveItemsBetweenColumns = (
    startIndex: number,
    finishIndex: number,
    startColumn: string,
    finishColumn: string,
    draggableId: string
  ) => {

    //------------------------------------------------------------
    //tìm item theo column start xong lấy nó ra
    const column1 = data.pipelineColumns.find(value =>
      value.name == startColumn)    

    const items1 = Array.from(column1.pipelineItems);
    console.log("before items1:", items1);
    
    const [newItemColumn] = items1.splice(startIndex, 1);
    console.log("after items1:", items1);
    

    //update item index column start
    const newItems1 = reassignIndex(items1);
    console.log("newItems1:", newItems1);
    
    //------------------------------------------------------------
    //bỏ item vừa lấy ra từ column start cho vào column finish
    const column2 = data.pipelineColumns.find(value =>
      value.name == finishColumn)

    const items2 = Array.from(column2.pipelineItems);
    console.log("before items2:", items2);

    items2.splice(finishIndex, 0, newItemColumn);
    console.log("after items2:", items2);
    //update item index column finish
    const newItems2 = reassignIndex(items2);
    console.log("newItems2:", newItems2);
    //------------------------------------------------------------

    // update lại state mới sau khi đổi chỗ
    const newColumn = data.pipelineColumns.map((item) => {
      if (item.name == startColumn)
        return { ...item, pipelineItems: newItems1 };
      else if (item.name == finishColumn)
        return { ...item, pipelineItems: newItems2 };
      else
        return item;
    })

    // Update and Record stage transition activity
    handleChangeStageItems(newColumn, draggableId, startColumn, finishColumn);
  }

  return {
    newPipeLine,
    setPipeLine,
    isError,
    handleMoveColumn,
    handleMoveItemColumn,
    handleMoveItemsBetweenColumns,
  };
};
