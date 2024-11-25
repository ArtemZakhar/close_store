if [ -z "$1" ]; then
  echo "Please provide a folder name."
  exit 1
fi

FOLDER_NAME=$1
COMPONENT_NAME=$(echo "$FOLDER_NAME" | sed -E 's/[^a-zA-Z0-9_]//g')

TARGET_DIR=${2:-$(pwd)}

FULL_PATH="$TARGET_DIR/$FOLDER_NAME"

mkdir -p "$FULL_PATH"

echo "const $COMPONENT_NAME = () => { 
  return <h1>$COMPONENT_NAME works</h1>; 
};

export default $COMPONENT_NAME;" > "$FULL_PATH/$COMPONENT_NAME.tsx"

echo "export const styles = {};" > "$FULL_PATH/$COMPONENT_NAME.styles.ts"

echo "import $COMPONENT_NAME from './$COMPONENT_NAME';

export default $COMPONENT_NAME;" > "$FULL_PATH/index.ts"

echo "Component $COMPONENT_NAME created successfully in $FULL_PATH!"