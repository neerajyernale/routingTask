


 export interface  Iuser {
  Uid: string;
  id:number;
  name: string;
  role: string;
  experience: number;
  status: boolean; 
  description: string;
  skills: string[];
  currentAddress: Address;
  permanentAddress: Address;
  imageUrl: string;
}

export interface Address {
  country: string;
  state: string;
  city: string;
  zipcode: string;
}