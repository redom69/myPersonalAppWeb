import React, { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

const CustomMultiSelect = ({ affectation, setFieldValue, editingPatient }) => {
  const { t } = useTranslation();

  const [newItem, setNewItem] = useState('');

  const addItem = (e) => {
    e.preventDefault(); // Previene el envío del formulario
    if (newItem.trim() && !affectation.includes(newItem)) {
      setFieldValue('affectation', [...affectation, newItem]);
      setNewItem('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem(e);
    }
  };

  return (
    <div>
      <MultiSelect
        value={affectation}
        options={affectation.map((item) => ({ label: item, value: item }))}
        onChange={(e) => setFieldValue('affectation', e.value)}
        placeholder="Select Items"
        display="chip"
        filter
        disabled={!editingPatient}
      />
      <div className="p-field p-grid mt-2">
        <div className="p-col-8">
          <InputText
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={t('pages.patients.form.addAffectation')}
            onKeyDown={handleKeyDown}
            disabled={!editingPatient}
          />
        </div>
        <div className="p-col-4">
          <Button
            label={t('pages.patients.form.add')}
            icon="pi pi-plus"
            onClick={addItem}
            disabled={!editingPatient}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomMultiSelect;
