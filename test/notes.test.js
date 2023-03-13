const noteCtrl = require('../controllers/noteController');

// test('should ', (noteCtrl.getAllNotes()) => {
    
// })

test('the data is peanut butter', async () => {
    const data = await noteCtrl.getAllNotes();
    expect(data).toBe('peanut butter');
  });
  
  test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
      await fetchData();
    } catch (e) {
      expect(e).toMatch('error');
    }
  });