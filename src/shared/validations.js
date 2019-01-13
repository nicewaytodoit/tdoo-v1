/*
+ one value fixed rule 
+ ove value adjustable rule {max, min}
+ multiple error return ...


- Array multiple cross values (property supplied)
    > function rule ... to be executed Group by or equal or what ever ...
    > 
- 'main value', 'property in array' and 'array'. => rule 


- two values comparison 'a@a.com' == 'b@a.com'

*/

export const validate = {
    isLengthOf2: {
        className: 'red',
        message: 'Lentgh syould be between 2 and 12',
        rule: ({value}) => { return value.length === 2; },
    },
    isString: {
        className: 'red',
        message: 'Value must be string',
        rule: ({ value }) => {
            return typeof value === 'string';
        },
    },
    isNumber: {
        className: 'red',
        message: 'Should be number',
        rule: ({ value }) => {
            return typeof value === 'number';
        },
    },
    isLowerThan: {
        className: 'red',
        message: 'Value must be string',
        // Always use different Config Names and Additional Values you want to pass 
        rule: ({ value, max }) => { 
            return value < max; 
        },
    },
    isLowerAndGreaterThan: {
        className: 'red',
        message: 'Value must be string',
        rule: ({ value, min, max }) => { 
            // console.log('>>MIN MAX>>', value, min, max);
            return value > min && value < max; 
        },
    },
    areEqaul: {
        className: 'red',
        message: 'Value must be same',
        rule: ({ value, value2 }) => { 
            console.log('###### >> same values >> ######', value, value2);
            return value && value2 && value.toLowerCase() === value2.toLowerCase(); 
        },
    },
};

export const helper = {
    getLaws: (arr) => {
        return arr.map((validator) => ({ ...validator }));
    }
}

// laws: [{ order: validate.isLengthOf2 }, { order: validate.isString }],
// shorter fn(that will return law construct from )
// override props ???
// this of props ???
// do we need something else?
const setup = () => ({
    name: {
        laws: [{ ...validate.isLengthOf2 }, { ...validate.isString }],
    },
    age: {
        laws: [{ ...validate.isLowerThan, max: 15, ruleDecorations: { align: '15px' }}],
    },
    stars: {
        laws: [
            { ...validate.isLowerAndGreaterThan, max: 10, min: 2, ruleDecorations: { type: 'isLowerAndGreaterThan', message: 'Custom START message! not enough or too much! between 2 and 10 !', align: '15px' }},
            { ...validate.isNumber, ruleDecorations: { type: 'isNumber', message: 'Must be a number!', align: '15px' }}
        ],
        returnAll: true,
    },
    email: {
        laws: [
            { ...validate.areEqaul },
        ],
    }
});


const state = {
    data: {
        name: 'Aleks',
        age: 12,
        stars: 5,
        address: {
            postcode: 'ab1cd2'
        },
        skills: ['js', 'react', 'test'],
        email: 'a@a.com'
    },
    // this should be managed automatically
    validationStatus: {
        name: {
            message: '',
            className: '',
            isValid: true,
        },
        age: {
            message: '',
            className: '',
            isValid: true,
        },
        skills: {
            message: '',
            className: '',
            isValid: true,
        }
    },
}







// validation.isValid('property', {value, comareAgainst, array})
// validation.areValid([array of property names state.data.keys], state.data,);


// multiple messages per rule or single messages ?
// validate all or single ?
class Validator {
    constructor(validationRules) {
        this.validationRules = validationRules;
    }

    // no parametar in get IsValid() {}
    isValid({ propertyName, value, ...restValues }) {
        // console.log('@@@@@ rest::', restValues);
        const { laws, returnAll } = this.validationRules[propertyName];
        // const response = { isValid: true, message: '', className: ''}; //extensible 
        const response = { isValid: true, errors: [] };
        for (const law of laws) {
            const { className, message, rule, ruleDecorations, ...restConfigs } = law;
            response.isValid = law.rule({ value, ...restConfigs, ...restValues }) && response.isValid;
            if (!response.isValid) {
                response.errors.push({
                    message,
                    className,
                    ...ruleDecorations
                });
                if (!(returnAll === true)) break;
            }
        }
        return response;
    }

    areValid() {


        return false;
    }
}

const validator = new Validator(setup());


export const fakeValidate = (prop, val) => {
    return validator.isValid({ propertyName: prop, value: val });
}

export const fakeValidate2 = (prop, val, val2) => {
    return validator.isValid({ propertyName: prop, value: val, value2: val2 });
}

// const a = {
//     ...(condition && {b: 1})
//  } --env=jsdom
// {a:2, c:4, ...(law.decoration && {...law.decoration})}
// console.log('@@@',validate.isLengthOf2.rule.length);
// console.log('@@@',validate.isString.rule.length);
// console.log('@@@',validate.isLowerThan.rule.length);

// fakeValidate('name', 'Al');