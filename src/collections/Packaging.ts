import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin';

const Packaging: CollectionConfig = {
  slug: 'packaging',
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

export default Packaging
