import { runOnJS, useAnimatedGestureHandler, useSharedValue, withTiming } from 'react-native-reanimated';
import { LongPressGestureHandlerGestureEvent } from 'react-native-gesture-handler';

type DelayGestureContext = {
  isStarted: boolean
}

export type UseDelayActionProps = {
  onStart: () => void
}

export const useDelayHandler = ({ onStart }: UseDelayActionProps) => useAnimatedGestureHandler<LongPressGestureHandlerGestureEvent,
  DelayGestureContext>({
    onFinish(_, ctx) {
      ctx.isStarted = false;
    },
    onActive(_, ctx) {
      if (ctx.isStarted) return;
      ctx.isStarted = true;
      runOnJS(onStart)();
    },
  });

type TouchGestureContext = {
  startX: number
  blocked: boolean
}

export type UseMoveHandlerProps = {
  isActionForbidden: boolean
  onCancel: () => void
  onComplete: () => void
}

export const useMoveHandler = ({
  isActionForbidden,
  onCancel,
  onComplete,
}: UseMoveHandlerProps) => {
  const x = useSharedValue(0);

  const handler = useAnimatedGestureHandler(
      {
        onStart(event, ctx: TouchGestureContext) {
          ctx.startX = x.value;
        },
        onActive(event, ctx) {
          if (isActionForbidden) return;
          const nextVal = ctx.startX + event.translationX;
          if (ctx.blocked) return;
          if (Math.abs(nextVal) > 150) {
            ctx.blocked = true;
            x.value = withTiming(0, { duration: 200 });
            runOnJS(onCancel)();
            return;
          }
          x.value = nextVal;
        },
        onEnd() {
          x.value = withTiming(0, { duration: 200 });
        },
        onFinish(_, ctx) {
          if (!ctx.blocked) {
            runOnJS(onComplete)();
          }
          ctx.blocked = false;
        },
      },
      [isActionForbidden],
  );

  return { x, handler };
};
