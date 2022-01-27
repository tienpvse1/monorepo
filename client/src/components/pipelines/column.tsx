import { PlusOutlined } from "@ant-design/icons"
import { useToggle } from "@hooks/useToggle"
import { IPipelineColumn } from "@modules/pipeline-column/entity/pipeline-column.entity"
import { Button } from "antd"
import { FC } from "react"
import { Draggable } from "react-beautiful-dnd"
import { PipelineItems } from "./items"
import { ColumnNameHeader } from "./pipeline-column/column-name-header"
import { FormEditColumnName } from "./pipeline-column/form-edit-column-name"
import { CardCreateItem } from "./pipeline-items/card-create"

interface PipeLineColumnProps {
  pipelineColumn: IPipelineColumn,
  index: number;
}

export const PipeLineColumn: FC<PipeLineColumnProps> = ({ pipelineColumn, index }) => {

  const [show, setShow] = useToggle();
  const [showEditForm, setShowEditForm] = useToggle();

  return (
    <Draggable draggableId={pipelineColumn.id} index={index}>
      {(providedColumn) => (
        <div
          className="wrapper-draggable-pipeline-column"
          ref={providedColumn.innerRef}
          {...providedColumn.draggableProps}
        >
          <div  {...providedColumn.dragHandleProps} className="pipeline-column-header" >
            {showEditForm ?
              <FormEditColumnName
                pipelineColumn={pipelineColumn}
                setShowEditForm={setShowEditForm}
              /> :
              <ColumnNameHeader
                pipelineColumn={pipelineColumn}
                setShowEditForm={setShowEditForm}
              />
            }
          </div>
          <Button
            onClick={setShow}
            style={{ marginTop: '10px', width: '100%', border: 'none' }}
          >
            <PlusOutlined />
          </Button>
          {show && <CardCreateItem pipelineColumnID={pipelineColumn.id} toggleClose={setShow} />}
          <PipelineItems pipelineColumn={pipelineColumn} />
        </div>

      )}
    </Draggable>

  )
}
