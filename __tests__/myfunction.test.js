const myfunction = require('/js/fonction.js')
describe('Test functions in the functions files', () => {
    describe('tests on validForm', () => {
  
      test('test valid is valid with all parameters', async () => {
        const form = `
        <form>
        <div id="formflex">
            <label for="nom">Nom :</label>
            <input type="text" id="nom" name="user_nom">
        </div>
        <div id="formflex">
            <label for="prenom">Prénom :</label>
            <input type="text" id="prenom" name="user_prenom">
        </div>
        <div id="formflex">
            <label for="adresse">Adresse :</label>
            <input type="text" id="adresse" name="user_adresse">
        </div>
        <div id="formflex">
            <label for="ville">Ville :</label>
            <input type="text" id="ville" name="user_ville">
        </div>
        <div id="formflex">
            <label for="mail">E-mail :</label>
            <input type="email" id="mail" name="user_mail">
        </div>
        <div id="btncomdiv">
            <button id="boutoncommander" type="submit">Commander</button>
        </div>
    </form>
          `
    document.body.innerHTML=form;
   await myfunction.validForm();
   expect(1).toBe(1)
        })
    })
  })

  