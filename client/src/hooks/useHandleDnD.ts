import { IPipelineColumn } from "@modules/pipeline-column/entity/pipeline-column.entity";
import { IPipeline } from "@modules/pipeline/entity/pipeline.entity";
import { useUpdatePipeline } from "@modules/pipeline/mutation/pipeline.update";
import { useChangeStage } from "@modules/pipeline-items/mutation/pipeline-items.update";
import { useState } from "react";

export const useHandleDnD = (data: IPipeline) => {

  const [newPipeLine, setPipeLine] = useState<IPipeline>();
  const { updatePipeline, isError } = useUpdatePipeline();
  const { mutate } = useChangeStage();

  const setNewPipeline = (newColumn: IPipelineColumn[]) => {

    const newState =
    {
      ...data,
      pipelineColumns: newColumn
    }
    setPipeLine(newState);
    updatePipeline(newState);
  }

  const setNewPipelineV2 = (
    newColumn: IPipelineColumn[],
    itemId: string,
    oldStageId: string,
    newStageId: string,
    finishIndex: number) => {

    const newState =
    {
      ...data,
      pipelineColumns: newColumn
    }
    setPipeLine(newState);

    mutate({
      id: itemId,
      oldStageId,
      newStageId,
      index: finishIndex
    });
  }

  const reassignIndex = <T>(array: Array<T>) => {
    return array.map((value, index) => ({ ...value, index: index }))
  }

  const handleMoveColumn = (startIndex: number, finishIndex: number) => {
    //lấy mảng pipelineColumns ra
    const pipelineNewColumns = Array.from(data.pipelineColumns);

    // lấy ra dữ liệu column đang được nắm kéo
    const [newItemColumn] = pipelineNewColumns.splice(startIndex, 1);

    // thêm dữ liệu column vừa đc lấy ra bỏ vào vị trí điểm đến finishIndex
    pipelineNewColumns.splice(finishIndex, 0, newItemColumn);

    //set lại column mới vô state
    // setNewPipeline(reassignIndex(pipelineNewColumns));
  }

  const handleMoveItemColumn = (startIndex: number, finishIndex: number, columnID: string) => {
    // tìm column theo name và trả về giá trị column tìm đc
    const column = data.pipelineColumns.find(value =>
      value.id == columnID)

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
      if (item.id == columnID)
        return { ...item, pipelineItems: result };
      else
        return item;
    })
    // setNewPipeline(newColumn);

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
      value.id == startColumn)

    const items1 = Array.from(column1.pipelineItems);
    const [newItemColumn] = items1.splice(startIndex, 1);
    //update item index column start
    const newItems1 = reassignIndex(items1);
    //------------------------------------------------------------
    //bỏ item vừa lấy ra từ column start cho vào column finish
    const column2 = data.pipelineColumns.find(value =>
      value.id == finishColumn)

    const items2 = Array.from(column2.pipelineItems);
    items2.splice(finishIndex, 0, newItemColumn);
    //update item index column finish
    const newItems2 = reassignIndex(items2);

    //------------------------------------------------------------

    // update lại state mới sau khi đổi chỗ 
    const newColumn = data.pipelineColumns.map((item) => {
      if (item.id == startColumn)
        return { ...item, pipelineItems: newItems1 };
      else if (item.id == finishColumn)
        return { ...item, pipelineItems: newItems2 };
      else
        return item;
    })

    // setNewPipeline(newColumn);
    setNewPipelineV2(newColumn, draggableId, startColumn, finishColumn, finishIndex);
    console.log("items id:", draggableId, "oldStageID:", startColumn, "newStageID:", finishColumn, "index:", finishIndex);

  }

  return {
    newPipeLine,
    setPipeLine,
    isError,
    handleMoveColumn,
    handleMoveItemColumn,
    handleMoveItemsBetweenColumns
  };
}