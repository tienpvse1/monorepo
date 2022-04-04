import { envVars } from "@env/var.env"
import { PageHeader } from "antd"

interface TableTitleProps {

}

export const TableTitle: React.FC<TableTitleProps> = ({ }) => {
  return (
    <PageHeader
      className='site-page-header'
      onBack={() => window.history.back()}
      title={
        <>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <img
              src={`${envVars.VITE_BE_DOMAIN}/files/schedule.png`}
              width={47}
              height={47}
            />
            <span
              style={{
                fontSize: '27px',
                color: 'rgba(0,0,0,0.7)',
                fontWeight: '700',
                marginLeft: '10px'
              }}
            >
              Schedule
            </span>
          </span>
        </>
      }
    />
  )
}
