import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldLevel } from "../access";
import { isAdminOrSelf } from "../access/isAdminOrSelf";
const Items: CollectionConfig = {
  slug: "items",
  access: {
    // Only admins can create users
    create: () => true,
    // Admins can read all, but any other logged in user can only read themselves
    read: () => true,
    // Admins can update all, but any other logged in user can only update themselves
    update: () => true,
    // Only admins can delete
    delete: () => true,
  },

  admin: {
    useAsTitle: "cod_interno",
  },

  fields: [
    {
      name: "cod_interno",
      type: "text",
    },
    {
      name: "rollos",
      type: "text",
    },
    {
      name: "peso",
      type: "number",
    },
    {
      name: "partida",
      type: "text",
    },
    {
      name: "precio",
      type: "number",
    },
    {
      name: "resultado",
      type: "number",
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data.peso && data.precio) {
              return (data.peso * data.precio).toFixed(2);
            }
            return 0;
          },
        ],
      },
    },
    {
      name: "fecha_partida",
      type: "date",
    },
    {
      name: "empaquetado",
      type: "relationship",
      relationTo: "packaging",
      hasMany: false,
    },
    {
      name: "tejido",
      type: "relationship",
      relationTo: "textil",
      hasMany: false,
    },
    {
      name: 'tipo_color',
      type: 'radio',
      options: [
        {
          label: 'Solido',
          value: 'solido',
        },
        {
          label: 'Listado',
          value: 'listado',
        },
      ],
      defaultValue: 'solido',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: "color",
      type: "relationship",
      relationTo: "color",
      hasMany: false,
    },
    {
      name: "proveedor",
      type: "relationship",
      relationTo: "supplier",
      hasMany: false,
    },
    {
      name: "ubicacion",
      type: "relationship",
      relationTo: "ubication",
      hasMany: false,
    },
  ],
};

export default Items;
