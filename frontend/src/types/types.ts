export type GadgetSpecifatications = {
    display: string,
    processor: string,
    ram: string,
    storage: string,
    camera: string,
    battery: string,
}

export type GadgetRatings = {
    average: number,
    count: number,
}

export type GadgetProductDetails = {
    brand: string,
    model: string,
    price: number,
    specification: GadgetSpecifatications,
    ratings: GadgetRatings,
    image: string,
    productId: string,
}

export type PageSegmentsInfo = {
    pagePath: string,
    pageName: string
}

export type AddressInfo = {
    name: string,
    house_number: string,
    street: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    phone: string,
}

export type UserInfo = {
    id: string,
    name: string,
    email: string,
    phone: string
}