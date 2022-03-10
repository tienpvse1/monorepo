import { KanBanFakeData } from './kanban';

interface KanbanColumnHeaderProps {
  data: Partial<KanBanFakeData>;
}

export const KanbanColumnHeader: React.FC<KanbanColumnHeaderProps> = ({
  data,
}) => {
  return (
    <div>
      <div
        style={{
          height: '3px',
          backgroundColor: data.color,
          marginBottom: '5px',
        }}
      ></div>
      <div
        style={{
          boxShadow:
            ' 0 10px 28px rgba(0,0,0,0.15), 0 6px 10px rgba(0,0,0,0.12)',
          padding: '10px',
          fontSize: 17,
        }}
      >
        {data.name}
      </div>
    </div>
  );
};
