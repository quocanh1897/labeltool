import React, { Component } from 'react'
import { trimNewLine, getSelectionText } from './utils'

export default class TextArea extends Component {
	constructor(props) {
		super(props)
		const text = props.text.split('\n').map(trimNewLine).join('\n')
		this.state = {
			text,
			runs: {
				0: {
					end: text.length,
					type: ''
				}
			}
		}
	}
	handleTextSelected = (e) => {
		const range = getSelectionText()
		if (range) {
			const { startContainer, endContainer, startOffset, endOffset } = range
			const startContainerId = startContainer.parentNode.id.split('-')
			const endContainerId = endContainer.parentNode.id.split('-')
			const startRunIdx = parseInt(startContainerId[0])
			const startRunLineOffset = parseInt(startContainerId[1])
			const endRunIdx = parseInt(endContainerId[0])
			const endRunLineOffset = parseInt(endContainerId[1])
			const startIdx = startRunIdx + startRunLineOffset + startOffset
			const endIdx = endRunIdx + endRunLineOffset + endOffset
			console.log(startIdx, endIdx)
			//First case: if the selection is in the middle of a run, then it will split the run into 3 new runs.
			const startRun = this.state.runs[startRunIdx]
			const endRun = this.state.runs[endRunIdx]

		}
	}
	render() {
		const { text, runs } = this.state
		let currentRuns = 0
		return (
			[
				<button onClick={this.handleTextSelected}>Mark</button>,
				<div id={this.props.id}>
					{
						Object.keys(runs).map(x => {
							const { end } = runs[x]
							let len = 0
							const temp = currentRuns
							currentRuns += end
							const parts = text.substring(x, end).split('\n')
							return parts.map((x, i) => {
								const id = len
								len += x.length
								if (i < parts.length - 1) {
									return ([
										<span key={`${temp}-${i}`} id={`${temp}-${id}`}>{x}</span>,
										<br key={`br${temp}-${i}`} />
									])
								} else {
									<span key={`${temp}-${i}`} id={`${temp}-${id}`}>{x}</span>
								}
							})
						})
					}
				</div>
			]
		)
	}
}