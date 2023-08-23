import { Table } from './components/Table.js';
import { softwareList } from './applications.js';
const root = document.getElementById('root');

const softwareListTable = document.createElement('table');
const sortableTable = new Table(
  softwareListTable,
  softwareList.data,
  softwareList.types
);
root.appendChild(sortableTable.render());

sortableTable.sortable();
sortableTable.filterable();

const downloadBtn = document.getElementById('download-list');

downloadBtn.addEventListener('click', () => {
  const headers = Object.keys(softwareList.types);
  const data = softwareList.data.map((row) => {
    return Object.values(row).join(',');
  });
  data.unshift(headers.join(','));
  const csvContent = data.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'software-list.csv');
  link.click();
});
