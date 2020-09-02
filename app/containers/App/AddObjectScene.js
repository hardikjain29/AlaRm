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
      position: [],
      selectedColor: 0,
    };
  },
  render: function() {
    const colors = ['#a1754c', 'green', 'blue', 'orange'];
    console.log(this.state.selectedColor);
    ViroMaterials.createMaterials({
      grid: {
        diffuseTexture: require('./res/grid_bg.jpg'),
      },
      face: {
        shininess: 2.0,
        lightingModel: 'Phong',
        diffuseColor: colors[this.state.selectedColor],
      },
    });
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>
        {/* <Viro3DObject
          source={require('./res/table/table-poly.obj')}
          resources={[require('./res/table/table-poly.mtl')]}
          position={[7, -8, -12]}
          scale={[0.5, 0.5, 0.5]}
          type="OBJ"
        /> */}
        {/* Text to show whether or not the AR system has initialized yet, see ViroARScene's onTrackingInitialized*/}
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />

        {/* <ViroBox
          position={[0, -0.5, -1]}
          animation={{ name: 'rotate', run: true, loop: true }}
          scale={[0.3, 0.3, 0.1]}
          materials={['grid']}
        /> */}

        {/* <Viro3DObject
          source={require('./res/table/table-poly.obj')}
          resources={[require('./res/table/table-poly.mtl')]}
          position={[0, -0.5, -1]}
          type="OBJ"
        /> */}

        {/* <Viro3DObject
          source={require('./res/table/table-tulip.obj')}
          position={[0, -0.5, -1]}
          type="OBJ"
          resources={[require('./res/table/texture1.jpg'), require('./res/table/texture2.png')]}
        /> */}

        {/* <Viro3DObject
          source={require('./res/piano/Piano.gltf')}
          resources={[require('./res/piano/Piano.bin')]}
          position={[0, -0.5, -1]}
          scale={[2, 2, 2]}
          rotation={[45, 0, 0]}
          type="GLTF"
        /> */}

        {/* <Viro3DObject
          source={require('./res/piano/Piano.obj')}
          resources={[require('./res/piano/Piano.mtl')]}
          position={[0, -0.5, -1]}
          type="OBJ"
        /> */}

        <ViroAmbientLight color={'#aaaaaa'} influenceBitMask={1} />

        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#aaaaaa"
          castsShadow={true}
        />

        {/* <Viro3DObject
          source={require('./res/table/West_Elm_Tripod_Table_OBJ.obj')}
          materials={['face']}
          rotation={[10, 120, 80]}
          position={[7, -8, -12]}
          scale={[0.1, 0.1, 0.1]}
          type="OBJ"
        /> */}

        {/* <Viro3DObject
          source={require('./res/bed2/uploads_files_2275745_Bed.obj')}
          position={[0, 0.5, 0]}
          scale={[0.01, 0.01, 0.01]}
          type="OBJ"
          lightReceivingBitMask={5}
          shadowCastingBitMask={4}
          transformBehaviors={['billboardY']}
          resources={[
            require('./res/bed2/Cotton_NRM.jpg'),
            require('./res/bed2/Cotton.jpg'),
            require('./res/bed2/Pillow_NormalMap.png'),
            require('./res/bed2/Sheet_Normal.png'),
            require('./res/bed2/Wood_Difuse.jpg'),
            require('./res/bed2/Wood_Glossines.jpg'),
            require('./res/bed2/Wood_Normal.jpg'),
            require('./res/bed2/Wood_Reflection.jpg'),
          ]}
        /> */}

        {/* Node that contains a light, an object and a surface to catch its shadow
            notice that the dragType is "FixedToWorld" so the object can be dragged
            along real world surfaces and points. */}
        <ViroARPlaneSelector
          onPlaneSelected={properties => {
            this.setState({
              position: properties.center,
            });
            console.log(properties);
          }}>
          <ViroNode position={[0, 0, 0]} dragType="FixedToWorld" onDrag={() => {}}>
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
              source={require('./res/chair/HUG_ARMCHAIR.obj')}
              resources={[
                require('./res/chair/HUG_ARMCHAIR.mtl'),
                require('./res/chair/HUG_ARMCHAIR_1.jpg'),
                require('./res/chair/HUG_ARMCHAIR_2.jpg'),
                require('./res/chair/26102005173551ds.jpg'),
              ]}
              //   materials={['face']}
              lightReceivingBitMask={5}
              shadowCastingBitMask={4}
              position={[0.05439671874046326, -0.933582067489624, 0.05868523195385933]}
              scale={[0.1, 0.15, 0.08]}
              type="OBJ"
            /> */}

            <Viro3DObject
              source={require('./res/table/table-poly.obj')}
              resources={[require('./res/table/table-poly.mtl')]}
              materials={['face']}
              key={this.state.selectedColor}
              onClick={() => {
                const { selectedColor } = this.state;
                if (selectedColor === 3) {
                  this.setState({
                    selectedColor: 0,
                  });
                } else {
                  this.setState(
                    {
                      selectedColor: this.state.selectedColor + 1,
                    },
                    () => {
                      console.log('changed');
                    },
                  );
                }
              }}
              lightReceivingBitMask={5}
              shadowCastingBitMask={4}
              position={[0.05439671874046326, -0.933582067489624, 0.05868523195385933]}
              scale={[0.1, 0.15, 0.08]}
              type="OBJ"
            />

            {/* <Viro3DObject
              source={require('./res/table/West_Elm_Tripod_Table_OBJ.obj')}
              materials={['face']}
              rotation={[18, 120, 100]}
              position={[-0.024999968707561493, -8, 0.09999995678663254]}
              scale={[0.1, 0.1, 0.1]}
              type="OBJ"
            /> */}

            {/*
            <Viro3DObject
              source={require('./res/table/table-poly.obj')}
              resources={[require('./res/table/table-poly.mtl')]}
              materials={['face']}
              lightReceivingBitMask={5}
              shadowCastingBitMask={4}
              position={[0, -5, 0]}
              scale={[0.4, 0.4, 0.4]}
              type="OBJ"
            /> */}
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

        {/* Node that contains a light, an object and a surface to catch its shadow
          notice that the dragType is "FixedToWorld" so the object can be dragged
          along real world surfaces and points. */}
        <ViroNode position={[0.5, -0.5, -0.5]} dragType="FixedToWorld" onDrag={() => {}}>
          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0, -1, -0.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={4}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={0.7}
          />

          {/* <Viro3DObject
            source={require('./res/object_soccerball/object_soccer_ball.vrx')}
            position={[0, 0.15, 0]}
            scale={[0.3, 0.3, 0.3]}
            type="VRX"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            transformBehaviors={['billboardY']}
            resources={[
              require('./res/object_soccerball/object_soccer_ball_diffuse.png'),
              require('./res/object_soccerball/object_soccer_ball_normal.png'),
              require('./res/object_soccerball/object_soccer_ball_specular.png'),
            ]}
          /> */}
          <ViroARPlaneSelector>
            <Viro3DObject
              source={require('./res/wow/emoji_wow.vrx')}
              position={[0, 0.5, 0]}
              scale={[0.3, 0.3, 0.3]}
              type="VRX"
              lightReceivingBitMask={5}
              shadowCastingBitMask={4}
              transformBehaviors={['billboardY']}
              resources={[
                require('./res/wow/emoji_wow_diffuse.png'),
                require('./res/wow/emoji_wow_normal.png'),
                require('./res/wow/emoji_wow_specular.png'),
              ]}
            />
          </ViroARPlaneSelector>
          {/* <Viro3DObject
              source={require('./res/table/table-poly.obj')}
              resources={[require('./res/table/table-poly.mtl')]}
              materials={['face']}
              lightReceivingBitMask={5}
              shadowCastingBitMask={4}
              position={[7, -8, -12]}
              scale={[1, 0.5, 0.5]}
              transformBehaviors={['billboardY']}
              type="OBJ"
            /> */}
          {/* <Viro3DObject
            source={require('./res/wow/emoji_wow.vrx')}
            position={[0, 0.15, 0]}
            scale={[0.3, 0.3, 0.3]}
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
          <ViroQuad rotation={[-90, 0, 0]} width={0.5} height={0.5} arShadowReceiver={true} lightReceivingBitMask={4} />
        </ViroNode>
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

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    duration: 250, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;
