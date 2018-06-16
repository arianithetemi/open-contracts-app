// Middleware that will validate the admin form fields
// if validation fails, errors will be returning in a list
// if validation passes, next middleware will be invoked
module.exports = (req, res, next) => {
    // Validation Rules
    req.checkBody('fistName', 'Emri duhet plotësuar!').notEmpty();
    req.checkBody('lastName', 'Mbiemri duhet plotësuar!').notEmpty();
    req.checkBody('gender', 'Gjinia duhet zgjedhur!').notEmpty();
    req.checkBody('email', 'Email duhet plotësuar!').isEmail();
    if(req.body.role == 'user'){
        req.checkBody('department','Drejtoria duhet zgjedhur').notEmpty();
    }
    req.checkBody('password', "Fjalëkalimi nuk është valid, fjalëkalimi duhet të jetë më i madh se 6 karaktere!").isLength({min: 6});

    var errors = req.validationErrors();

    if(errors) {
        res.json({
            errVld: errors,
        });
    } else {
        next();
    }
}