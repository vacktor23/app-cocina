curl -X POST http://localhost:8080/recipes \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODA5ZjE0YzljMThiYzY5NTMxZWU5ZGYiLCJpYXQiOjE3NDU0ODIxNzEsImV4cCI6MTc0NTQ4NTc3MX0.x8jUPNpfulr9pKSp6911GhRLYad0dXY4psfMuRe6ml0' \
-H 'Content-Type: application/json' \
-d '{
        "image":"https://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg",
        "title":"Tortilla francesa",
        "description":"no saben comer los gabachos.",
        "cookingTime":2,
        "ingredients":["huevos","aceite"]
        
    }' -v