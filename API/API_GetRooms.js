const express = require( 'express' );
const router = express.Router();
const mongoose = require( 'mongoose' );
const empty = require( 'is-empty' );

const Reservation = require( "../models/Reservation_model" );
const Rooms = require( '../Rooms' );


function SortRooms( req, res ) {
	let equipement = req.params.equipement.split( ',' );
	return Rooms.rooms.filter( room => {
		let count = 0;
		let tab = [];
		room.equipements.forEach( elem => {
			tab.push( elem.name );
		} );
		if ( tab[ 0 ] !== undefined ) {
			equipement.forEach( equip => {
				if ( Object.values( tab ).includes( equip ) )
					count++;
			} )
		}
		return ( count !== 0 );
	} )
}

router.get( '/:date/:time/:equipement?', ( req, res ) => {

	if ( req.params.time !== undefined && req.params.date !== undefined ) {
		let ListRooms;

		Reservation.find( { Date: req.params.date, Time: req.params.time.split( ':' )[ 0 ] }, ( err, reservation ) => {
			if ( err ) {
				return res.json( { success: false, msg: 'Probleme.' } );
			} else if ( !empty( reservation ) && reservation.name !== null ) {

				if ( req.params.equipement !== undefined ) {
					ListRooms = SortRooms( req, res );
				} else {
					ListRooms = Rooms.rooms;
				}
				reservation.forEach( ( value ) => {
					let filteredRooms = ListRooms.filter( room => {
						return room.name !== value.RoomName;
					} );
					ListRooms = filteredRooms
				} );
				return res.json( { success: true, rooms: ListRooms } );
			} else {
				if ( req.params.equipement !== undefined ) {
					return res.json( { success: true, rooms: SortRooms( req, res ) } );
				} else {
					return res.json( { success: true, rooms: Rooms.rooms } );
				}
			}
		} )
	} else {
		return res.json( { success: false, msg: 'Veuillez seclectionner une date et une heure' } );
	}
} );

module.exports = router;
