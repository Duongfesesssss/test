<template>
  <div style="height:100vh; width:100vw">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="[21.024345, 105.854859]"
      @click="onMapClick"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      />
      
      <LCircle
        :lat-lng="[21.027865, 105.852301]"
        :radius="2000"
        color="black"
        :stroke="false"
        weight="3"
        opacity="0.1"
        fillColor="red"
      />
      
      <LCircleMarker     
        :lat-lng="[21.024345, 105.854859]"
        radius="6"
        color="blue"
      />

      <LControlAttribution position="topright" prefix="Bản đồ thế giới" />

      <LControlScale position="topright" :updateWhenIdle="true" :imperial="true" :metric="false" />
      
      <LControlZoom position="bottomleft" />
      
      <LControl position="bottomleft">
        <button
          style="background: white; color: black; padding: 2px; border-radius: 5px;"
          @click="clickHandler"
        >Bấm làm ...</button>

        <button style="background: white; color: black; padding: 2px; border-radius: 5px;"
          @click="vai"
        >
          Chưa setup
        </button>
      </LControl>
      
      



      <LMarker :lat-lng="[21.027865, 105.852301]">
        <LIcon :icon-url="iconUrl" :icon-size="iconSize" />
        <LPopup>Đây là tháp Rùa</LPopup>
      </LMarker>


      <LFeatureGroup>
        <LMarker :lat-lng="[21.027865, 105.854859]">
          <LTooltip>Sở ngoại vụ Hà Nội</LTooltip>
        </LMarker>
      </LFeatureGroup>

      <LFeatureGroup>
        <LMarker 
          v-for="(building, index) in buildings"  :key="index"   :lat-lng="[building.latitude, building.longitude]"
        >
          <LTooltip>{{ building.name }}</LTooltip>
          <LPopup>
            <div>
              <p><strong>Tên:</strong> {{ building.name }}</p>
              <p><strong>Địa chỉ:</strong> {{ building.address }}</p>
              <p><strong>Vĩ độ:</strong> {{ building.latitude }}</p>
              <p><strong>Kinh độ:</strong> {{ building.longitude }}</p>
              </div>
        </LPopup>
        </LMarker>
      </LFeatureGroup>




    </LMap>
  </div>
</template>

<script setup>
import { ref, computed , onMounted } from 'vue';

const buildings = ref([]);

const zoom = ref(10);
const mapRef = ref(null);

const clickHandler = () => {
  alert('Gâu gâu');
};

const vai = () => {
  alert('Chưa setup');
};

const iconWidth = ref(21);
const iconHeight = ref(42);
const iconUrl = computed(() => `https://th.bing.com/th/id/R.3da1e5f53acc180565078b306a406704?rik=VbD4CD8kCRhicg&pid=ImgRaw&r=0`);
const iconSize = computed(() => [iconWidth.value, iconHeight.value]);



const onMapClick = (e) => {
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`Bạn bấm vào map tại toạ độ ${e.latlng.toString()}`)
    .openOn(e.target);
};



const zoomLocation = (lat, lng) => {
  if (mapRef.value) {
    mapRef.value.setView([lat, lng], 15);
  }
};






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








onMounted(() => {
  fetchBuildings();
  zoomLocation();
});






</script>

<style scoped>
#map {
  height: 100vh;
  width: 100vw;
}
</style>
