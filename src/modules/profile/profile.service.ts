import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MerchantService } from '../merchant/merchant.service';
import { QueryUserDto } from '../users/dto/query-user.dto';
import { UpdateUserDto } from '../users/dto/user.dto';

@Injectable()
export class ProfileService {
    constructor(readonly userService: UsersService,
        readonly merchantService: MerchantService,
    ){}

    /// pastikan tidak panggila langsung ke prisma dan gunakan userservice
    async getProfile(userId: string){
        // isinya profile, merchant, dan default address
        const userData = await this.userService.findByID(userId)
        const defaultAddress = userData.address?.find(
        (address) => address.isDefault
    );

    return {
        profile: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            phone: userData.handphone,
            avatar: userData.avatarUrl,
        },
        merchant: userData.merchant,
        defaultAddress,
    }
}

    async updateProfile(userId: string, dto: UpdateUserDto){
        //isinya update semua kecuali password
        return await this.userService.update(userId, dto)
    }

    async resetPassword(){
        // isinya : pastikan password baru tidak sama dengan password lama dan update
    }

    async summary() {
        // isinya info detail untuk customer : total orders, total spent, active orders, default address
    }

    async dashboard() {
        // isinya order terbaru, product yang terakhir dilihat dan rekomendasi
    }

    async becomeMerchant() {
        // isinya tambah data baru pada merchant
    }
}
