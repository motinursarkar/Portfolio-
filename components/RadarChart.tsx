
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Skill } from '../types';

interface Props {
  skills: Skill[];
}

export const RadarChart: React.FC<Props> = ({ skills }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 40;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const angleStep = (Math.PI * 2) / skills.length;

    // Grid circles
    const levels = 5;
    for (let i = 1; i <= levels; i++) {
      const r = (radius / levels) * i;
      g.append("circle")
        .attr("r", r)
        .attr("fill", "none")
        .attr("stroke", "#334155")
        .attr("stroke-dasharray", "4 4");
    }

    // Axes
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      g.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", "#334155");

      g.append("text")
        .attr("x", Math.cos(angle) * (radius + 20))
        .attr("y", Math.sin(angle) * (radius + 20))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#94a3b8")
        .attr("font-size", "12px")
        .text(skill.name);
    });

    // Radar area
    const line = d3.lineRadial<Skill>()
      .radius(d => (d.level / 100) * radius)
      .angle((d, i) => i * angleStep)
      .curve(d3.curveLinearClosed);

    g.append("path")
      .datum(skills)
      .attr("d", line)
      .attr("fill", "rgba(14, 165, 233, 0.2)")
      .attr("stroke", "#0ea5e9")
      .attr("stroke-width", 2)
      .attr("transform", "rotate(90)");

    // Data points
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (skill.level / 100) * radius;
      g.append("circle")
        .attr("cx", Math.cos(angle) * r)
        .attr("cy", Math.sin(angle) * r)
        .attr("r", 4)
        .attr("fill", "#0ea5e9");
    });

  }, [skills]);

  return (
    <div className="flex justify-center items-center w-full">
      <svg ref={svgRef} width="100%" height="400" viewBox="0 0 400 400"></svg>
    </div>
  );
};
