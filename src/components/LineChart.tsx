import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { ChartProps } from "@/types";

export function LineChart({ chartName, data }: ChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const parseDate = d3.timeParse("%Y-%m-%d");
    const dataWithDate = data.map((d) => ({ ...d, dateObj: parseDate(d.date)! }));

    const x = d3
      .scaleTime()
      .domain(d3.extent(dataWithDate, (d) => d.dateObj) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(dataWithDate, (d) => d.value) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<{ dateObj: Date; value: number }>()
      .x((d) => x(d.dateObj))
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(dataWithDate)
      .attr("fill", "none")
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 2)
      .attr("d", line as any);

    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("padding", "6px 10px")
      .style("background", "rgba(0,0,0,0.7)")
      .style("color", "#fff")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("opacity", 0);

    svg
      .append("g")
      .selectAll("circle")
      .data(dataWithDate)
      .join("circle")
      .attr("cx", (d) => x(d.dateObj))
      .attr("cy", (d) => y(d.value))
      .attr("r", 5)
      .attr("fill", "#4f46e5")
      .on("mouseover", (event, d) => {
        const container = svgRef.current!.getBoundingClientRect();
        tooltip
          .style("opacity", 1)
          .html(`${d3.timeFormat("%b %d")(d.dateObj)}<br/>${d.value}`)
          .style("left", `${event.clientX - container.left + 10}px`)
          .style("top", `${event.clientY - container.top - 28}px`);
      })
      .on("mousemove", (event) => {
        const container = svgRef.current!.getBoundingClientRect();
        tooltip
          .style("left", `${event.clientX - container.left + 10}px`)
          .style("top", `${event.clientY - container.top - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    const xAxis = d3.axisBottom<Date>(x).tickFormat(d3.timeFormat("%b %d") as (date: Date) => string);
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));
  }, [data]);

  return (
    <div className="w-full max-w-full overflow-x-auto relative">
      <h3 className="text-lg font-semibold mb-2">{chartName}</h3>
      <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-64 sm:h-80 md:h-96"></svg>
      <div ref={tooltipRef}></div>
    </div>
  );
}
