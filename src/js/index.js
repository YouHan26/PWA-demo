/**
 * Created by YouHan on 2017/1/20.
 */

fetch('/v2/articles', {
  headers: {
    'Schlep': 'PAG=1',
    'Content-Type': 'application/json',
    'Refer': 'http://192.168.0.127'
  }
})
  .then((res) => {
    if (res && res.ok) {
      return res.json();
    }
  }).then((res) => {
  console.log(res);
}, (error) => {
  console.log(error);
}).catch((error) => {
  console.log(error);
});