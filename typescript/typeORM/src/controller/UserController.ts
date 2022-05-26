import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"

export class UserController {
	private userRepository = AppDataSource.getRepository(User)

	async index(request: Request, response: Response, next: NextFunction) {
		return { ok: true }
	}

	async all(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.find()
	}

	// async one(request: Request, response: Response, next: NextFunction) {
	// 	// return this.userRepository.findOne(request.params.id)
	// 	return { hello: 'ok' }
	// }

	// async save(request: Request, response: Response, next: NextFunction) {
	// 	return this.userRepository.save(request.body)
	// }

	// async remove(request: Request, response: Response, next: NextFunction) {
	// 	let userToRemove = await this.userRepository.findOneBy({ id: 1 })
	// 	await this.userRepository.remove(userToRemove)
	// }

}