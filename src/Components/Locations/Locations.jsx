import { useEffect, useState } from 'react';
import { capitalize } from '../../Utilities';
import './Locations.css';

export default function Locations(props) {
	const { api, index, targets } = props;
	const [locations, setLocations] = useState(null);
	const [versions, setVersions] = useState(null);

	useEffect(() => {
		api.getResource(`api/v2/pokemon/${index}/encounters`).then(encounters => {
			let [locs, vers] = processLocations(encounters, targets);
			setLocations(locs);
			setVersions(vers);
		});
	}, [api, index, targets]);

	return (
		<>
			<h4>Locations</h4>
			{versions && versions.length !== 0 ?
				<div>
					{versions.map(ver => {
						return(
							<>
								<span style={{fontWeight:'bold'}}>{capitalize(ver)}: </span>
								<ul>{locations[ver].map(loc => {
									return (<li>{loc}</li>)
								})}
								</ul>
							</>
						)
					})}
					<br/>
				</div>
			:
				<div><ul><li>Unknown</li></ul></div>
			}
		</>
	)
}

function processLocations(locations, targets) {
	let locByVersion = {};
	let versions = new Set();
	locations.forEach(loc => {
		loc.version_details.forEach(ver => {
			if (targets.includes(ver.version.name)) {
				versions.add(ver.version.name);
				let locName = capitalize(loc.location_area.name.substring(0, loc.location_area.name.length-5));
				locByVersion[ver.version.name] ? locByVersion[ver.version.name].push(locName) : locByVersion[ver.version.name] = [locName];
			}
		});
	});
	return [locByVersion, Array.from(versions)];
}