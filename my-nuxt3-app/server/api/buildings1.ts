let buildings = {
    "data": [
      {
        "id": 1,
        "name": "Great Wall of China",
        "address": "Bắc Kinh, Trung Quốc",
        "representative": "Wang Wei",
        "phone": "1234567890",
        "cccd": "123456789012",
        "cccdDate": "2010/04/01",
        "latitude":  40.431908,
        "longitude": 116.570374
      },
      {
        "id": 2,
        "name": "Petra",
        "address": "Ma'an Governorate, Jordan",
        "representative": "Ali Hassan",
        "phone": "2345678901",
        "cccd": "234567890123",
        "cccdDate": "2015/06/10",
        "latitude": 30.328960,
        "longitude": 35.444832
      },
      {
        "id": 3,
        "name": "Christ the Redeemer",
        "address": "Rio de Janeiro, Brazil",
        "representative": "Carlos Silva",
        "phone": "3456789012",
        "cccd": "345678901234",
        "cccdDate": "2018/11/15",
        "latitude": -22.951911,
        "longitude": -43.210487
      },
      {
        "id": 4,
        "name": "Machu Picchu",
        "address": "Cusco Region, Peru",
        "representative": "Jose Martinez",
        "phone": "4567890123",
        "cccd": "456789012345",
        "cccdDate": "2012/09/20",
        "latitude": -13.163141,
        "longitude": -72.544963
      },
      {
        "id": 5,
        "name": "Chichen Itza",
        "address": "Yucatán, Mexico",
        "representative": "Maria Gonzalez",
        "phone": "5678901234",
        "cccd": "567890123456",
        "cccdDate": "2014/05/22",
        "latitude": 20.684285,
        "longitude": -88.567783
      },
      {
        "id": 6,
        "name": "Roman Colosseum",
        "address": "Rome, Italy",
        "representative": "Giovanni Rossi",
        "phone": "6789012345",
        "cccd": "678901234567",
        "cccdDate": "2017/08/14",
        "latitude": 41.890251,
        "longitude": 12.492373
      },
      {
        "id": 7,
        "name": "Taj Mahal",
        "address": "Agra, Uttar Pradesh, India",
        "representative": "Raj Patel",
        "phone": "7890123456",
        "cccd": "789012345678",
        "cccdDate": "2019/12/01",
        "latitude": 27.175015,
        "longitude": 78.042155
      },
      {
        "id": 8,
        "name": "Great Pyramid of Giza",
        "address": "Giza, Egypt",
        "representative": "Ahmed El-Sayed",
        "phone": "8901234567",
        "cccd": "890123456789",
        "cccdDate": "2013/03/18",
        "latitude": 29.979235,
        "longitude": 31.134202
      }
    ]
  };
  
  
  
  export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    const { id } = getQuery(event);
  
    if (method === 'GET') {
      return buildings;
    }
  
    if (method === 'POST') {
      const newBuilding = await readBody(event);
      newBuilding.id = buildings.data.length ? buildings.data[buildings.data.length - 1].id + 1 : 1; //truy cập id phần tử cuối cùng 
      buildings.data.push(newBuilding);                               
      return newBuilding;
    }
  
    if (method === 'PUT') {
      const buildingId = parseInt(id as string, 10);
      const updatedBuilding = await readBody(event);
      const index = buildings.data.findIndex((b) => b.id === buildingId);
      if (index !== -1) {
        buildings.data[index] = { ...updatedBuilding, id: buildingId }; 
        return buildings.data[index];
      } else {
        return { message: "Building not found" };
      }
    }
  
    if (method === 'DELETE') {
      const { id } = getQuery(event);
      const buildingId = parseInt(id as string, 10);
      buildings.data = buildings.data.filter((b) => b.id !== buildingId);
      return { message: 'Deleted successfully' };
    }
  });
  