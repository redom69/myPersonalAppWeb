import { t } from 'i18next';

const ConfigPatient = ({ config }) => {
  const getValue = (value) =>
    value !== undefined && value !== null ? value : t('noData');

  const configItems = [
    {
      label: t('pages.patients.form.weight'),
      value: getValue(config.weight),
    },
    {
      label: t('pages.patients.form.height'),
      value: getValue(config.height),
    },
    {
      label: t('pages.maintenance.ingestion.shoe'),
      value: getValue(config.shoe),
    },
    {
      label: t('pages.maintenance.ingestion.femurl'),
      value: getValue(config.femur_len_l),
    },
    {
      label: t('pages.maintenance.ingestion.tibial'),
      value: getValue(config.tibia_len_l),
    },
    {
      label: t('pages.maintenance.ingestion.walker'),
      value: getValue(config.walker_len),
    },
    {
      label: t('pages.maintenance.ingestion.abdl'),
      value: getValue(config.hip_abd_l),
    },
    {
      label: t('pages.maintenance.ingestion.abdr'),
      value: getValue(config.hip_abd_r),
    },
    {
      label: t('pages.maintenance.ingestion.flexoshipl'),
      value: getValue(config.flexor_hip_flex_l),
    },
    {
      label: t('pages.maintenance.ingestion.flexoshipr'),
      value: getValue(config.flexor_hip_flex_r),
    },
    {
      label: t('pages.maintenance.ingestion.flexkneel'),
      value: getValue(config.flexor_knee_flex_l),
    },
    {
      label: t('pages.maintenance.ingestion.flexkneer'),
      value: getValue(config.flexor_knee_flex_r),
    },
    {
      label: t('pages.maintenance.ingestion.flexanklel'),
      value: getValue(config.flexor_ankle_flex_l),
    },
    {
      label: t('pages.maintenance.ingestion.flexankler'),
      value: getValue(config.flexor_ankle_flex_r),
    },
    {
      label: t('pages.maintenance.ingestion.corset'),
      value: getValue(config.corset),
    },
    {
      label: t('pages.maintenance.ingestion.anckle_lock'),
      value: getValue(config.anckle_lock),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {t('pages.maintenance.ingestion.config')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {configItems.map((item) => (
          <div
            key={item.label}
            className="p-4 border rounded-full bg-gray-50 hover:bg-gray-100 transition duration-300 text-center"
          >
            <h3 className="text-md font-semibold text-gray-700 capitalize">
              {item.label.replace(/_/g, ' ')}
            </h3>
            <p className="text-lg text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigPatient;
