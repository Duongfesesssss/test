<template>
    <div>
      <div class="container-fluid">
        <h1 class="text-center">Danh sách các toà nhà</h1>
        <div class="mt-4">
          <div>
            <DataTable :columns="columns" ajax="/api/info" class="table table-striped" width="100%">
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import Swal from 'sweetalert2';
  import { Form, Field, defineRule } from 'vee-validate';
  import { length } from '@vee-validate/rules';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net-bs5';
  import { useFetch } from '#app';
   
  const columns = [
    { data: 'id', title: 'ID' },
    { data: 'name', title: 'Tên tòa nhà' },
    { data: 'address', title: 'Địa chỉ' },
    { data: 'representative', title: 'Người đại diện' },
    { data: 'phone', title: 'Số điện thoại' },
    { data: 'cccd', title: 'CCCD' },
    { data: 'cccdDate', title: 'Ngày cấp CCCD' },
    {
      data: null,
      title: 'Hành động',
    }
  ];

  DataTable.use(DataTablesCore);
  </script>
  