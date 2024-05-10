describe('User Management', () => {
    let userId; // Variable to store the user ID
    let token ='Bearer 8f9dcebb1cc219b70c16afeb1d4a55d6cd080ed35637a956f535ff8b4d0ab729'
  
    it('Verify id returned is in numerical format', () => {
      cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public/v2/users',
        headers: {
          Authorization: token, 
        },
        body: {
          "name": 'John Doe',
          "gender": 'male',
          "email": 'john.doe+4@example.com',
          "status": 'active'
        },
      }).then((response) => {
        expect(response.status).to.equal(201); 
        expect(response.body.id).to.be.a('number'); // Scenario 1:  verify id returned is in numerical format
        userId = response.body.id; // Store user ID 
        cy.log(JSON.stringify(response.body));
      });
    });
  
    it('Verify status for the first entry', () => {
      cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public/v2/users'
      }).then((response) => {
        expect(response.status).to.equal(200); 
        expect(response.body[0].status).to.be.oneOf(['active', 'inactive']); // Scenario 2:Verify status for first entry is only either "active" or "inactive" 
        cy.log(JSON.stringify(response.body));
      });
    });
  
    it('Delete User', () => {
      cy.request({
        method: 'DELETE',
        url: `https://gorest.co.in/public/v2/users/${userId}`,
        headers: {
          Authorization: token,
        }
      }).then((response) => {
        expect(response.status).to.equal(204); 
        cy.log(JSON.stringify(response.body));
      });
    });
  });
  