# WebGL-Marching-Cubes

View it online [here](https://josephsullivan256.github.io/WMC/index.html).

You know that feel when you have a 3D scalar field and you're just dying to render a surface level? Fear no more, [marching cubes](https://en.wikipedia.org/wiki/Marching_cubes) is here to save the day. Invented to visualize CT and MRI scans, now here's an implementation in javascript. The possibilities are endless. Maybe you can create funky underwater terrain as in this [nvidia gpu gem](https://developer.nvidia.com/gpugems/gpugems3/part-i-geometry/chapter-1-generating-complex-procedural-terrains-using-gpu). Who knows?

![image](https://github.com/JosephSullivan256/WebGL-Marching-Cubes/blob/master/marching-cubes.png?raw=true)

Here's the scalar field "1-(x^2 + y^2 + z^2)" rendered at some surface level between -1 and 1. There's some clipping at the edges, so we have those gaps.

## Future Plans

I hope to add some interpolation so that the surface doesn't look so jagged, and I really ought to fix the normals so there isn't that checker board pattern.
