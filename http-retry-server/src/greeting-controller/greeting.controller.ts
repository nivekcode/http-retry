import {Controller, Get, Res} from '@nestjs/common';
import {Response} from 'express';

@Controller('/')
export class GreetingController {

    private counter = 0;

    @Get('/greet')
    public greet(@Res() res: Response) {
        // return res.status(200).send({greeting: 'Greetings from the controller'});
        console.log('The counter', this.counter);
        if (this.counter === 3) {
            this.counter = 0;
            return res.status(200).send({
                greeting: 'Greetings from the controller'
            });
        }
        this.counter++;
        return res.status(500).send('Something went wrong');
    }

}
