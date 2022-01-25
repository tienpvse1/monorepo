import { PlusOutlined } from "@ant-design/icons"
import { useToggle } from "@hooks/useToggle"
import { IPipelineColumn } from "@modules/pipeline-column/entity/pipeline-column.entity"
import { Button } from "antd"
import { Draggable } from "react-beautiful-dnd"
import { PipelineItems } from "./items"
import { CardCreateItem } from "./pipeline-items/card-create"

interface PipeLineColumnProps {
  pipelineColumn: IPipelineColumn,
  index: number;
}

export const PipeLineColumn = ({ pipelineColumn, index }: PipeLineColumnProps) => {

  const [show, setShow] = useToggle();

  return (
    <Draggable draggableId={pipelineColumn.name} index={index}>
      {(providedColumn) => (
        <div
          className="wrapper-draggable-pipeline-column"
          ref={providedColumn.innerRef}
          {...providedColumn.draggableProps}
        >
          <div className="pipeline-column-header" >
            <h1 {...providedColumn.dragHandleProps}>
              {pipelineColumn.name.toUpperCase()}
            </h1>
          </div>
          <Button
            onClick={setShow}
            style={{ marginTop: '10px', width: '100%', border: 'none' }}
          >
            <PlusOutlined />
          </Button>
          {show && <CardCreateItem />}
          <PipelineItems pipelineColumn={pipelineColumn} />
        </div>

      )}
    </Draggable>

  )
}
