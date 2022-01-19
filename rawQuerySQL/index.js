const { sequelize } = require("./src/connection");
const sns = require("./src/sns");

let generateRetroactiveContracts = async () => {
    const queryOperationByStatus = "SELECT * FROM operations.operation where status in (\"VIGENTE\", \"ATRASADA\", \"PERDOADA\", \"LIQUIDADA\") limit 1";
    sequelize.query(queryOperationByStatus).then(([results]) => {
        console.log(results);

        results.forEach(operation => {
            let messageCCB = {
                applicationUuid: operation.application_uuid,
                borrowerDocument: operation.borrower_document,
                contractNumber: operation.contract_number,
                contractType: "BORROWER"
            };
            console.log(messageCCB);
            sns(messageCCB);

            const queryInvestmentGroup = "SELECT * FROM operations.investment_group where fk_operation_id=" + operation.id;
            sequelize.query(queryInvestmentGroup).then(function ([investmentGroups]) {
                console.log(investmentGroups);
                return investmentGroups;
            }).then(function (investmentGroups) {
                investmentGroups.map(investor => {
                    console.log(investor);

                    let messageCV = {
                        applicationUuid: operation.application_uuid,
                        borrowerDocument: operation.borrower_document,
                        document: investor.investor_document,
                        contractNumber: operation.contract_number,
                        contractType: "INVESTOR"
                    };
                    console.log(messageCV);
                    sns(messageCV);
                })
            })
        })
    });

};

generateRetroactiveContracts();
