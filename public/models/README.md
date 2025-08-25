# Maya 3D Models

Place your GLB files in this directory to use them with the Maya3D component.

## Usage

1. Add your GLB file to this `public/models/` directory
2. Use the Maya3D component with the `glbPath` prop:

```jsx
<Maya3D 
  glbPath="/models/your-model.glb"
  height="400px" 
  showMessage={true}
  message="Hello! I'm Maya!"
  className="animate-float"
/>
```

## Supported Formats
- GLB (preferred)
- GLTF

## Recommendations
- Keep models under 5MB for optimal performance
- Optimize textures and geometry before export
- Test models in different lighting conditions

## Example GLB Sources
- [Sketchfab](https://sketchfab.com) - Free and paid 3D models
- [Poly Pizza](https://poly.pizza) - Free low-poly models
- Create your own in Blender, Maya, or other 3D software