import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    async index(request: Request, response: Response) {
        //cidade, uf, items (query params)
        const { city, uf, items } = request.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
            .join('points_items', 'points.id', '=', 'points_items.point_id')
            .whereIn('points_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        const serializedPoints = points.map(point => {
            return {
                ...point,
                //procurar como automatizar
                image_url: `http://localhost:3333/uploads/${point.image}`,
            };
        });

        return response.json(serializedPoints);


    }



    async show(request: Request, response: Response) {
        //const id = request.params.id;
        // desestruturacao
        const { id } = request.params;
        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not Found' });
        }

        const serializedPoint = {
            ...point,
            //procurar como automatizar
            image_url: `http://localhost:3333/uploads/${point.image}`,
        };

        //SELECT * FROM items JOIN point_items ON items.id = points_items.item_id 
        //WHERE point_items.point_id = {id}
        const items = await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id)
            .select('items.title');

        return response.json({ point: serializedPoint, items });

    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        // quando tem mais de uma TRANSACAO com o banco 
        //assim se der erro em uma a outra tambem nao executa
        const trx = await knex.transaction();

        const point = {
            // short sintaxe quando o nome da variavel eh igual a propriedade do objeto
            // sem ela ficaria assim:
            // name:name
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point);
        //ids
        const point_id = insertedIds[0];
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id
                }
            });

        await trx('points_items').insert(pointItems);

        await trx.commit();

        return response.json({
            id: point_id,
            // ... spread operator abrevia tudo que tem dentro do objeto point
            ...point
        });
    }
}
export default PointsController;

