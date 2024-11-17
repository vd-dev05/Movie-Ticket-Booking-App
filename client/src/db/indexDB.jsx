import Dexie from 'dexie';

// Khởi tạo cơ sở dữ liệu Dexie
const db = new Dexie('mov-idb-store-history');

// Định nghĩa các bảng và chỉ mục
db.version(1).stores( {
    user: 'userName',
    history: '++id, movieId, time'
});

// Mở cơ sở dữ liệu
db.open().catch((err) => {
  console.error('Database failed to open:', err);
});

export {
    db
}