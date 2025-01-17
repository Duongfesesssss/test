export default defineEventHandler(async (event) => {
    let buildings = {
        "data": [
            {
                "id": 1,
                "name": "Building A",
                "address": "123 Main St, City A",
                "representative": "John Doe",
                "phone": "1234567890",
                "cccd": "123456789012",
                "cccdDate": "2022/01/15"
            },
            {
                "id": 2,
                "name": "Building B",
                "address": "456 Elm St, City B",
                "representative": "Jane Smith",
                "phone": "0987654321",
                "cccd": "987654321098",
                "cccdDate": "2021/05/22"
            },
            {
                "id": 3,
                "name": "Building C",
                "address": "789 Oak St, City C",
                "representative": "Emily Johnson",
                "phone": "1122334455",
                "cccd": "112233445566",
                "cccdDate": "2023/03/18"
            },
            {
                "id": 4,
                "name": "Building D",
                "address": "321 Pine St, City D",
                "representative": "Michael Brown",
                "phone": "6677889900",
                "cccd": "667788990011",
                "cccdDate": "2020/08/30"
            },
            {
                "id": 5,
                "name": "Building E",
                "address": "654 Cedar St, City E",
                "representative": "Sarah Davis",
                "phone": "5544332211",
                "cccd": "554433221199",
                "cccdDate": "2019/11/25"
            }
        ]
    };

    return buildings;
});
