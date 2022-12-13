# How to build new components
Code structure : 
```
├── src
│   ├── components
|   │   ├── ComponentName
|   |   │   ├── ComponentName.tsx
|   |   │   └── index.ts
|   │   └── index.ts
│   └── index.ts
├── package.json
└── package-lock.json
```
Compare this code structure with that of the existing code in the library. This file structure has to be followed for creating and publishing new components.
Follow these steps to build a new component

- Create a directory in `src/components` with the name of your component
- All code files of the component go inside this directory. 
- Write code for your component, and export the component from this file : `ComponentName.tsx`
- Create index.ts inside this directory
- In index.ts, import the component exported by `ComponentName.tsx` and export it as default using the following example snippet 
`export  {  default  }  from  "./ComponentName";`

Bravo! You have successfully created your component. 

# How to use component in react code
- Install the npm package : [Link](https://github.com/pranshukharkwal/alphaa-react-component-library/pkgs/npm/alphaa-react-component-library)
[This is a private package, so you won't be able to install it unless you have the ssh keys to my github. Ones this package gets hosted to public npm registry, you should be able to install it]
- Import component using the snippet : `import {ComponentName} from  "@pranshukharkwal/alphaa-react-component-library"`
- Use the imported component anywhere in your react code.

An open source tutorial and code was followed in order to build this library. In case of any issues or confusions, the tutorial can be referred to : [Tutorial link](https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe)
