import React, { Component } from 'react'
import { Container, Content, View } from 'native-base'

import Card from '../../../components/Card'
import MyTitle from '../../../components/MyTitle'
import LoadingPage from '../../../components/LoadingPage'
import { appointmentsThisWeekOnSnapshot } from '../../../api'

export default class UpcomingAppointmentsScreen extends Component {
  state = {
    appointments: {},
    isLoading: true
  }

  async componentDidMount() {
    this.unsubscribe = await appointmentsThisWeekOnSnapshot(
      appointments =>
        this.setState({
          appointments,
          isLoading: false
        }),
      true
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingPage />
    }

    const appointments = Object.entries(this.state.appointments)
      // remove keys with no appointments
      .filter(([_, appointments]) => Boolean(appointments.length))
      // display remaining keys
      .map(([title, appointments], i) => (
        <View key={i}>
          <MyTitle>{title}</MyTitle>
          {appointments.map((appointment, i) => {
            return (
              <Card
                key={i}
                canEdit
                canCheckIn
                type="appointment"
                {...appointment}
              />
            )
          })}
        </View>
      ))

    if (Boolean(appointments.length)) {
      return (
        <Container>
          <Content style={{ marginBottom: 15 }}>{appointments}</Content>
        </Container>
      )
    }

    return (
      <MyTitle style={{ fontStyle: 'italic' }}>
        No more appointments this week
      </MyTitle>
    )
  }
}
