import { validate, IsString, IsNumber } from 'class-validator';
import { plainToClass, Expose, Exclude, classToPlain } from 'class-transformer';

@Exclude()
class User {
    @IsString()
    name: string;

    @IsNumber()
    @Expose({ name: 'supera'})
    age: number;

    @Exclude()
    password: string;

    @Expose()
    get fname () {
        return this.name;
    }
}

const u1 = new User();

u1.name = 'tom';
u1.age = 12;
u1.password = 'asd';
const u2 = { name: 'eddie', supera: 12, password: 'dsa' };

// console.log(u1);
const t = plainToClass(User, u2);
console.log(t)
console.log(classToPlain(u1))
// validate(u1).then(console.log).catch(console.log)
// validate(t).then(console.log).catch(console.log)

// console.log()