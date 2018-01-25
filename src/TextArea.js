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
					type: 'normal',
					prev: null,
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
			const { runs } = this.state
			const startRun = runs[startRunIdx]
			console.log('Start Run', startRunIdx)
			const endRun = runs[endRunIdx]
			const newEndRun = { ...endRun, prev: startIdx }
			let i = startRun['end']
			while (i && i <= endRunIdx && runs[i]) {
				const l = runs[i]['end']
				delete runs[i]
				i = l
			}
			startRun['end'] = startIdx
			if (!runs[endIdx]) {
				runs[endIdx] = newEndRun
				if (runs[newEndRun['end']]) {
					runs[newEndRun['end']]['prev'] = endIdx
				}
			} else {
				runs[endIdx].prev = startIdx
			}
			if (!runs[startIdx]) {
				runs[startIdx] = {
					type: 'blue',
					end: endIdx,
					prev: startRunIdx
				}
			} else {
				runs[startIdx].type = 'blue'
				runs[startIdx].end = endIdx
			}
			i = startIdx
			// Merge run before
			while (i && runs[i] && runs[i].prev) {
				const prev = runs[i].prev
				if (runs[prev].type === runs[i].type) {
					runs[prev].end = runs[i].end
					delete runs[i]
					i = prev
				} else break
			}
			// Merge run after
			console.log(i)
			while (i && runs[i]) {
				const next = runs[i].end
				if (runs[next] && runs[next].type === runs[i].type) {
					runs[i].end = runs[next].end
					delete runs[next]
				} else if (runs[next]) {
					runs[next].prev = i
					break
				} else {
					break
				}
			}
			this.setState({ runs })
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
							const { end, type } = runs[x]
							const color = type === 'blue' ? type : 'black'
							let len = 0
							const temp = currentRuns
							currentRuns = end
							const parts = text.substring(x, end).split('\n')
							return parts.map((x, i) => {
								const id = len
								len += x.length + 1
								if (i < parts.length - 1) {
									return ([
										<span key={`${temp}-${i}`} id={`${temp}-${id}`} style={{ color: color }}>{x}</span>,
										<br key={`br${temp}-${i}`} />
									])
								} else {
									return <span key={`${temp}-${i}`} id={`${temp}-${id}`} style={{ color: color }}>{x}</span>
								}
							})
						})
					}
				</div>
			]
		)
	}
}