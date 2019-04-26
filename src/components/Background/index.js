// @flow
import React, { Component } from 'react';

import './index.css';

const docWidth = window.innerWidth;
const docHeight = window.innerHeight;

type Props = {
  mouseX: number, mouseY: number
}

class Background extends Component<Props> {
  componentDidMount() {
    this.drawCanvas();
  }

  drawCanvas = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    const canvasW = docWidth;
    const canvasH = docHeight;
    ctx.clearRect(0, 0, canvasW, canvasH);
    setInterval(() => {
      const randomWidth = canvasW * Math.random();
      const randomHight = canvasH * Math.random();
      const randomColor = `rgba(${Math.round(
        256 * Math.random()
      )},${Math.round(256 * Math.random())},${Math.round(
        256 * Math.random()
      )},0.3)`;

      ctx.beginPath();
      ctx.moveTo(randomWidth, canvasH * Math.random());
      ctx.lineTo(randomWidth, canvasH * Math.random());
      ctx.strokeStyle = randomColor;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvasW * Math.random(), randomHight);
      ctx.lineTo(canvasW * Math.random(), randomHight);
      ctx.strokeStyle = randomColor;
      ctx.stroke();
    }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <canvas className="Background" ref="canvas" width={docWidth} height={docHeight} />
      </React.Fragment>
    );
  }
}
export default Background;
