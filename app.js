import { Table } from './components/Table.js';
import { softwareList } from './applications.js';
const root = document.getElementById('root');

const softwareListTable = document.createElement('table');
const softwareListDataWithLinks = softwareList.data.map((row) => {
  const data = { ...row };
  data.download_link = `<a href="${row.download_link}">${row.application}</a>`;
  data.docs = `<a href="${row.docs}">Docs</a>`;
  return data;
});
const sortableTable = new Table(
  softwareListTable,
  softwareListDataWithLinks,
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

const search = window.location.search;
const params = new URLSearchParams(search);
console.log(params);

if (params.size > 0) {
  const searchParamKey = params.keys().next().value;
  const searchParamValue = params.get(searchParamKey);
  console.log(searchParamKey, searchParamValue.toString());

  document.querySelector('.search-input').value = searchParamValue;
  document.querySelector('.search-options').value = searchParamKey;

  sortableTable.filter(searchParamKey, searchParamValue);
}
