<template>
  <div>
  <h1>full chức năng chưa validation </h1>
    <div class="container-fluid">
      <h1 class="text-center">Danh sách các toà nhà</h1>
      <div class="card flex justify-center">
        <Form v-if="show" @submit="submit" class="form-container">
    <div class="form-group">
      <FloatLabel>
        <InputText id="name" v-model="newBuilding.name" class="custom-input" />
        <label for="name">Tên tòa nhà</label>
      </FloatLabel>
    </div> 

    <div class="form-group">
      <FloatLabel>
        <InputText id="address" v-model="newBuilding.address" class="custom-input" />
        <label for="address">Địa chỉ</label>
      </FloatLabel>
    </div> 

    <div class="form-group">
      <FloatLabel>
        <InputText id="representative" v-model="newBuilding.representative" class="custom-input" />
        <label for="representative">Người đại diện</label>
      </FloatLabel>
    </div>

    <div class="form-group">
      <FloatLabel>
        <InputText id="phone" v-model="newBuilding.phone" class="custom-input" />
        <label for="phone">Số điện thoại</label>
      </FloatLabel>
    </div>

    <div class="form-group">
      <FloatLabel>
        <InputText id="cccd" v-model="newBuilding.cccd" class="custom-input" />
        <label for="cccd">CCCD</label>
      </FloatLabel>
    </div>
    

    <div class="form-group">
      <FloatLabel>
        <DatePicker v-model="newBuilding.cccdDate" dateFormat="dd/mm/yy" class="custom-date" />
        <label for="cccdDate">Ngày cấp CCCD</label>
      </FloatLabel>
    </div>

    <div class="form-group">
      <FloatLabel>
        <InputText id="latitude" v-model="newBuilding.latitude" class="custom-input" />
        <label for="latitude">Vĩ độ</label>
      </FloatLabel>
    </div> 
    
    <div class="form-group">
      <FloatLabel>
        <InputText id="longitude" v-model="newBuilding.longitude" class="custom-input" />
        <label for="longitude">Kinh độ</label>
      </FloatLabel>
    </div> 

    

    <div class="form-actions">
      <button type="submit" v-if="!isEditing" class="btn btn-primary ml-2">Thêm</button>
        <button type="submit" v-if="isEditing" class="btn btn-primary ml-2">Cập nhật</button>
        <button type="button" @click="cancelEdit" v-if="isEditing" class="btn btn-secondary ml-2">Hủy</button>
        <button type="button" @click="clearForm" v-if="isEditing" class="btn btn-secondary ml-2">Xóa hết</button>
        <button type="button" @click="resetAll" v-if="!isEditing" class="btn btn-danger ml-2">Xóa danh sách</button>
    </div>
  </Form>
      
      </div>

      <div class="mt-4">
        <button @click="toggleForm" class="btn btn-success mb-3">{{ show ? "Đóng" : "Form" }}</button>
        <div>
          <DataTable :columns="columns" :data="buildings" class="table table-striped" width="100%">
            <template #column-9="{ row, rowIndex }">
              <button type="button" class="btn btn-primary" @click="editBuilding(rowIndex)">Chỉnh sửa</button>
              <button type="button" class="btn btn-danger" @click="removeBuilding(rowIndex)">Xóa</button>
            </template>
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
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import DatePicker from 'primevue/datepicker';






defineRule('length', length);
defineRule('required', value => {
  if (!value || !value.length) {
    return 'Trường này không được để trống';
  }
  return true;
});
defineRule('minlength', (value, [limit]) => {
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return `Ít nhất ${limit} ký tự`;
  }
  return true;
});
defineRule('flength', (value, [limit]) => {
  if (!value || !value.length) {
    return true;
  }
  if (value.length !== limit || value.length !== 9) {
    return `Yêu cầu ${limit} hoặc 9 ký tự`;
  }
  return true;
});
defineRule('number', value => {
  if (!value || !value.length) {
    return true;
  }
  const numberPattern = /^[0-9]+$/;
  if (!numberPattern.test(value)) {
    return 'Giá trị phải là dãy số';
  }
  return true;
});

const schema = {
  name: 'required|minlength:4',
  address: 'required|minlength:4',
  representative: 'required|minlength:4',
  phone: 'required|number|length:10',
  cccd: 'required|number|length:12',
  cccdDate: 'required'
};

const newBuilding = ref({
  id: null,
  name: '',
  address: '',
  representative: '',
  phone: '',
  cccd: '',
  cccdDate: '',
  latitude:'',
  longitude:'',
  
});

const buildings = ref([]);
const isEditing = ref(false);
const currentIndex = ref(null);
const show = ref(false);

const apiBaseUrl = 'http://localhost:3000/api/buildings1';


const fetchBuildings = async () => {
  try {
    const data = await $fetch(apiBaseUrl,{
      method: 'GET' 
    });

    buildings.value = data.data ;
    console.log("Buildings:", buildings.value);
  } 
  catch (error) {
    console.error(error);
  }
};



const addBuilding = async () => {
  try {
    const data = await $fetch(apiBaseUrl, {
      method: 'POST',
      body: JSON.stringify(newBuilding.value),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("1");
    buildings.value.push(data);   //thêm toà nhà mới vào danh sách buildings
    console.log("2");
    saveBuildings(); 
    resetForm(); 
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Bạn đã thêm thành công',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error('Error adding building:', error);
  }
};


const updateBuilding = async () => {
  if (currentIndex.value !== null) {
    try {
      const data = await $fetch(`${apiBaseUrl}?id=${newBuilding.value.id}`, {
        method: 'PUT',
        body: JSON.stringify(newBuilding.value),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Cập nhật danh sách buildings
      buildings.value[currentIndex.value] = { ...newBuilding.value };
      saveBuildings(); 
      resetForm(); 
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cập nhật thành công',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      console.error('Error updating building:', err);
    }
  }
};





const removeBuilding = async (index) => {
  const buildingId = buildings.value[index].id;

  try {
    const data = await $fetch(`${apiBaseUrl}?id=${buildingId}`, {
      method: 'DELETE'
    });

    // Xoá thành công
    buildings.value.splice(index, 1);
    saveBuildings(); 
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Xoá thành công',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error('Error deleting building:', error);
  }
};



// lưu buildings vào localstorage
 const saveBuildings = () => {
  localStorage.setItem('buildingss', JSON.stringify(buildings.value));
};

const loadBuildings = () => {
  const savedBuildings = localStorage.getItem('buildingss');
  if (savedBuildings) {
    buildings.value = JSON.parse(savedBuildings);
    //console.log(buildings.value);

    buildings.value.forEach(building => {
        if (!building.hasOwnProperty('longitude')) {
          building.longitude = null;
        }
        if (!building.hasOwnProperty('latitude')) {
          building.latitude = null;
        }
      });


  }
};


const resetForm = () => {
  newBuilding.value = {
    id: null,
    name: '',
    address: '',
    representative: '',
    phone: '',
    cccd: '',
    cccdDate: '',
    latitude:'',
    longitude:'',
    
    
  };
  isEditing.value = false;
  currentIndex.value = null;
};

const resetAll = () => {
  localStorage.clear();
  buildings.value = [];
  saveBuildings();
};

const editBuilding = (index) => {
  isEditing.value = true;
  currentIndex.value = index;
  newBuilding.value = { ...buildings.value[index] };
  show.value = true;
};

const cancelEdit = () => {
  resetForm();
  show.value = false;
};

const clearForm = () => {
  newBuilding.value = {
    id: null,
    name: '',
    address: '',
    representative: '',
    phone: '',
    cccd: '',
    cccdDate: '',
    latitude:'',
    longitude:'',
    
  };
};

const searchBuilding = ref("");

const fbuildings = computed(() => {
  if (!searchBuilding.value) {
    return buildings.value;
  }
  return buildings.value.filter((x) => {
    const query = searchBuilding.value.toLowerCase();
    return (
      x.id.toString().includes(query) ||
      x.name.toLowerCase().includes(query) ||
      x.address.toLowerCase().includes(query) ||
      x.representative.toLowerCase().includes(query) ||
      x.phone.toLowerCase().includes(query) ||
      x.cccd.toLowerCase().includes(query) ||
      x.cccdDate.toLowerCase().includes(query)
    );
  });
});

const submit = (values) => {
  if (isEditing.value) {
    updateBuilding();
  } else {
    addBuilding();
  }
};

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'name', title: 'Tên tòa nhà' },
  { data: 'address', title: 'Địa chỉ' },
  { data: 'representative', title: 'Người đại diện' },
  { data: 'phone', title: 'Số điện thoại' },
  { data: 'cccd', title: 'CCCD' },
  { data: 'cccdDate', title: 'Ngày cấp CCCD' },
  { data: 'latitude', title: 'Vĩ độ' },
  { data: 'longitude', title: 'Kinh độ' },
  { data: null, title: 'Hành động', },
  
];

const toggleForm = () => {
  show.value = !show.value;
};




DataTable.use(DataTablesCore);

onMounted(() => {
  loadBuildings();
  fetchBuildings();
});
</script>

<style scoped>
.form-container {
  max-width: 40000px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px; /* Thêm khoảng cách dưới mỗi nhóm form */
}

.custom-input {
  width: 400px; 
  padding: 10px; 
  font-size: 18px; 
  box-sizing: border-box; 
  
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.card {     
            display: flex;
            width: 600px;
            background-color: #f0f0f0;
            text-align: center;
            justify-content: center;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            margin: auto;
          
        }


.custom-date{
  width: 420px;
  padding: 10px; 
  font-size: 18px; 
  box-sizing: border-box; 
  
}



</style>