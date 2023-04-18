export interface Credits {
    adult: boolean,
    gender: number,
    id: number
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    credit_id: string,
}


export interface Cast extends Credits {
    character: string
    order: number
}

export interface Crew extends Credits {
    department: string
    job: string
}