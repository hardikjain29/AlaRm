import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroQuad,
  ViroNode,
  ViroAnimations,
  ViroConstants,
} from 'react-viro';

var createReactClass = require('create-react-class');

var HelloWorldSceneAR = createReactClass({
  getInitialState() {
    return {
      hasARInitialized: false,
      text: 'Initializing AR...',
    };
  },
  render: function() {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>
        <ViroARPlaneSelector>
          <ViroNode position={[5, -0.5, -0.5]} dragType="FixedToWorld" onDrag={() => {}}>
            {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}
            <ViroSpotLight
              innerAngle={5}
              outerAngle={45}
              direction={[0, -1, -0.2]}
              position={[0, 3, 0]}
              color="#ffffff"
              castsShadow={true}
              influenceBitMask={2}
              shadowMapSize={2048}
              shadowNearZ={2}
              shadowFarZ={5}
              shadowOpacity={0.7}
            />

            {/* <Viro3DObject
            source={require('./res/piano/Piano.gltf')}
            resources={[require('./res/piano/Piano.bin')]}
            position={[0, 0.2, 0]}
            scale={[2, 2, 2]}
            rotation={[45, 0, 0]}
            type="GLTF"
          /> */}

            <Viro3DObject
              source={require('./res/table/table-poly.obj')}
              resources={[require('./res/table/table-poly.mtl')]}
              materials={['face']}
              lightReceivingBitMask={5}
              shadowCastingBitMask={4}
              transformBehaviors={['billboard']}
              position={[7, -8, -12]}
              scale={[0.5, 0.5, 0.5]}
              type="OBJ"
            />
            {/* <Viro3DObject
              source={require('./res/wow/emoji_wow.vrx')}
              position={[0, 0.5, 0]}
              scale={[2, 2, 2]}
              type="VRX"
              lightReceivingBitMask={5}
              shadowCastingBitMask={4}
              transformBehaviors={['billboardY']}
              resources={[
                require('./res/wow/emoji_wow_diffuse.png'),
                require('./res/wow/emoji_wow_normal.png'),
                require('./res/wow/emoji_wow_specular.png'),
              ]}
            /> */}

            {/* <Viro3DObject
            source={require('./res/bed/BED.obj')}
            resources={[require('./res/bed/BED.png')]}
            position={[7, -8, -12]}
            scale={[2, 0.5, 0.5]}
            type="OBJ"
          /> */}

            {/* <Viro3DObject
            source={require('./res/piano/Piano.obj')}
            resources={[require('./res/piano/Piano.mtl')]}
            position={[0, 0.2, 0]}
            type="OBJ"
          /> */}

            {/* <Viro3DObject
            source={require('./res/table/table-tulip.obj')}
            position={[0, -0.5, -1]}
            type="OBJ"
            resources={[require('./res/table/texture1.jpg'), require('./res/table/texture2.png')]}
          /> */}

            {/* <Viro3DObject
            source={require('./res/table/table-poly.obj')}
            position={[0, 0.2, 0]}
            type="OBJ"
            resources={[require('./res/table/texture1.jpg'), require('./res/table/texture2.png')]}
          /> */}

            <ViroQuad
              rotation={[-90, 0, 0]}
              width={0.5}
              height={0.5}
              arShadowReceiver={true}
              lightReceivingBitMask={2}
            />
          </ViroNode>
        </ViroARPlaneSelector>

        {/* <ViroARPlaneSelector> */}
        {/* <Viro3DObject
            source={require('./res/table/table-poly.obj')}
            resources={[require('./res/table/table-poly.mtl')]}
            materials={['face']}
            position={[0, 0.25, 0]}
            scale={[0.5, 0.5, 0.5]}
            type="OBJ"
          /> */}

        {/* <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0, -1, -0.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={0.7}
          /> */}

        {/* <Viro3DObject
            source={require('./res/wow/emoji_wow.vrx')}
            position={[0, 0.5, 0]}
            scale={[0.5, 0.5, 0.5]}
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            transformBehaviors={['billboardY']}
            type="VRX"
            resources={[
              require('./res/wow/emoji_wow_diffuse.png'),
              require('./res/wow/emoji_wow_normal.png'),
              require('./res/wow/emoji_wow_specular.png'),
            ]}
          /> */}

        {/* <ViroBox position={[0, 0.25, 0]} scale={[0.5, 0.5, 0.5]} /> */}
        {/* </ViroARPlaneSelector> */}
      </ViroARScene>
    );
  },
  _onTrackingUpdated(state, reason) {
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    if (!this.state.hasARInitialized && state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        hasARInitialized: true,
        text: 'CFG Hackathon 2020',
      });
    }
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  face: {
    shininess: 2.0,
    lightingModel: 'Phong',
    diffuseColor: '#a1754c',
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    duration: 250, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;
