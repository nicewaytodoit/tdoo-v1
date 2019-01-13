import { validate, fakeValidate, fakeValidate2 } from '../../shared/validations';


describe('# Validation module :', () => {
    it('should have class of red', () => {
        expect(validate.isLengthOf2.className).toBe('red');
    });

    it('function Argument number should be 1', () => {
        expect(validate.isLengthOf2.rule.length).toBe(1);
        expect(validate.isString.rule.length).toBe(1);
        expect(validate.isLowerThan.rule.length).toBe(1);
    });


    describe.skip('# Checking fakeValidationFunction :', () => {
        const validationRespons = {
            "isValid": false, 
            "errors": [{"className": "red", "message": "Lentgh syould be between 2 and 12"}]}

        it('should return True if name is string', () => {
            const result = fakeValidate('name', 'Al');
            console.log('--------------',result);
            expect(result.isValid).toBeTruthy();
        });

        it('should return True if name is string', () => {
            expect(fakeValidate('name', 'Ale')).toEqual(validationRespons);
        });

        it('should return False if !age! 15 or more', () => {
            expect(fakeValidate('age', 15).isValid).toBeFalsy();
            expect(fakeValidate('age', 25).isValid).toBeFalsy();
        });

        it('should return TRUE if !age! 14 or less', () => {
            expect(fakeValidate('age', 14).isValid).toBeTruthy();
            expect(fakeValidate('age', 1).isValid).toBeTruthy();
        });

        it('should return False if !stars! 2 and 10 ', () => {
            expect(fakeValidate('stars', 1).isValid).toBeFalsy();
            expect(fakeValidate('stars', 11).isValid).toBeFalsy();
            expect(fakeValidate('stars', 11).errors[0].message).toEqual('Custom START message! not enough or too much! between 2 and 10 !');
            const numCheck = fakeValidate('stars', 'test');
            console.log('>>>>', numCheck);
            expect(numCheck.isValid).toBeFalsy();
        });

        it('should return TRUE if !stars! 2 and 10', () => {
            expect(fakeValidate('stars', 3).isValid).toBeTruthy();
            expect(fakeValidate('stars', 9).isValid).toBeTruthy();
        });

        it('should return TRUE if !stars! 2 and 10', () => {
            expect(fakeValidate('stars', 1).isValid).toBeFalsy();
            expect(fakeValidate('stars', 15).isValid).toBeFalsy();
            expect(fakeValidate('stars', 11).isValid).toBeFalsy();
        });
    });

    describe('# Emails should be equal :', () => {
        it('should return True if 2 emails equal', () => {
            expect(fakeValidate2('email', 'ab.A@com', 'aB.a@com').isValid).toBeTruthy();
        });
        it('should return False if 2 emails not equal', () => {
            const result = fakeValidate2('email', 'a@a.com', '');
            expect(result.isValid).toBeFalsy();
        });
    });

});

// npm install --save-dev babel @babel/register babel-preset-react-app enzyme enzyme-adapter-react-16 jasmine-enzyme jsdom jasmine
//  