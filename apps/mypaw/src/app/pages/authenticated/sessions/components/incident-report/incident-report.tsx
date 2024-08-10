import { ScrollPanel } from 'primereact/scrollpanel';

/* eslint-disable-next-line */
export interface IncidentReportProps {}

export function IncidentReport(props: IncidentReportProps) {
  const incidents = [];

  const itemsTemplate = (item, i) => {
    return (
      <div className="" key={i}>
        <div>
          {item.date} - {item.time} - {item.title}: {item.description}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-3 py-4 border-2 surface-border border-round-2xl border-dashed surface-card">
      <ScrollPanel
        style={{ width: '100%', height: '200px' }}
        className="custombar1 p-0"
      >
        {incidents && incidents.map((event, i) => itemsTemplate(event, i))}

        {!incidents && (
          <div className="text-center ">
            <div>No hay incidencias</div>
          </div>
        )}
      </ScrollPanel>
    </div>
  );
}

export default IncidentReport;
