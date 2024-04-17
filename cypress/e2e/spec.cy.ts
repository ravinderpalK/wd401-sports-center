let baseUrl = "http://localhost:5000";

const generateRandomEmail = () => {
  const timestamp = new Date().getTime();
  return `user${timestamp}@example.com`;
};

const email = generateRandomEmail();

describe("Testing Sports Center Application", () => {
  it("create an account", () => {
    cy.visit(baseUrl + "/signup");

    cy.get('input[name="name"]').type("ravinderpal");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type("ravinderpal");

    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });

  it("should not login with invalid credentials", () => {
    cy.visit(baseUrl + "/signin");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type("inv@lid");
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/signin");
    });
  });
});

describe("Sports Center Test,", () => {
  beforeEach(() => {
    cy.visit(baseUrl + "/signin");

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type("ravinderpal");
    cy.get('button[type="submit"]').click();
    cy.wait(500);
  });

  it("Set Preferences", () => {
    cy.get("#preferencesBtn").click();
    cy.get('input[name="sports"]').check(["basketball", "Cricket"])
    cy.get('input[name="teams"]').check(["Thunderbolts", "Dragonslayers", "Nova Knights"]);

    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get(".trending-new-article").should("exist");
    cy.get(".favourite-article").should("exist");

  });

  it("Read an Article", () => {
    cy.get('.trending-new-article').first().find('button').click();
    cy.get('#article-details').should("exist");
  })

  it("Test Logout", () => {
    cy.get("#account").click();
    cy.contains("signout", { matchCase: false }).click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });
});