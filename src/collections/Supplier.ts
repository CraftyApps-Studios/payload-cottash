import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin';

//Provedor

const Supplier: CollectionConfig = {
  slug: 'supplier',
  access: {
    // Anyone can create, even unauthenticated
    create: () => true,
    // No one can update, ever
    update: () => true,
    // Only admins can read
    read: () => true,
    // No one can delete, ever
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    }
  ],
}

export default Supplier
