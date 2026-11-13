// Pruebas de interfaz de las publicaciones.
// Requiere el backend (npm run dev) y el frontend (ionic serve) en ejecución.

describe('Publicaciones', () => {
  it('muestra las publicaciones del servidor', () => {
    cy.visitarConSesion('/publicaciones', 'ana', 'ana-12345')
    cy.contains('h2', 'Bienvenidos al Taller 11')
  })

  it('crea una publicación', () => {
    // Título único: las pruebas se ejecutan muchas veces contra el mismo servidor.
    const titulo = `Publicación de Cypress ${Date.now()}`

    cy.visitarConSesion('/publicaciones', 'ana', 'ana-12345')
    cy.get('ion-fab-button').click()
    cy.get('ion-modal input').type(titulo)
    cy.get('ion-modal textarea').type('Creada por una prueba de interfaz')
    cy.contains('ion-modal ion-button', 'Guardar').click()

    cy.contains('ion-item', titulo).should('contain', 'Tuya')
  })

  it('no permite editar publicaciones de otros usuarios', () => {
    cy.visitarConSesion('/publicaciones', 'ana', 'ana-12345')

    // «Postman» es una publicación de carla: no debe estar dentro de un ion-item-sliding.
    cy.contains('h2', 'Postman').parents('ion-item-sliding').should('not.exist')
  })
})